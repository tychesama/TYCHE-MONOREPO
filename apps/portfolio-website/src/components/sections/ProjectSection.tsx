// Very over engineered
// I had to get some assistance
// I am not confident on what I made here

"use client";
import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay, pointerWithin, useDroppable, useDraggable } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProjectCard from "../common/ProjectCard";
import type { Project } from "../../types/project";
import { FaCircleQuestion } from "react-icons/fa6";
import ProjectFilterModal from "../modal/ProjectFilterModal";

interface ProjectProps {
  projects: Project[];
}

interface DropZoneProps {
  droppedProject?: Project;
}

interface TagCategory {
  [key: string]: string[];
}

const DraggableExpanded: React.FC<{ project: Project; className?: string }> = ({
  project,
  className,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: project.name,
    });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 
      ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {!isDragging && (
        <ProjectCard
          project={project}
          type="expanded"
          className={`w-full h-full ${className || ""}`}
          attributes={attributes}
          listeners={listeners}
        />
      )}
    </div>
  );

};

const DropZone: React.FC<DropZoneProps & { activeProject?: Project | null }> = ({ droppedProject, activeProject }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "drop-zone" });

  return (
    <div
      ref={setNodeRef}
      style={
        isOver && activeProject
          ? {
            borderColor: activeProject.color,
            backgroundColor: `${activeProject.color}20`,
          }
          : undefined
      }
      className={`ml-5 relative rounded-lg overflow-hidden flex-1 rounded-xl min-h-[310px]
      border-2
      transition-[border-color,background-color,box-shadow] duration-500 ease-out
      ${droppedProject
          ? "border-transparent"
          : isOver
            ? "shadow-[0_0_0_1px_var(--color-accept)]"
            : "border-dashed border-[var(--color-primary)] bg-transparent"
        }
      flex items-center justify-center`}
    >
      {!droppedProject && !isOver && (
        <span className="absolute inset-0 flex items-center justify-center text-[var(--color-text-subtle)] bg-[var(--color-card)] text-base font-medium">
          Drop Here
        </span>
      )}

      {isOver && !droppedProject && activeProject && (
        <span className="absolute inset-0 flex items-center justify-center text-[var(--color-text-subtle)] text-base font-medium">
          {activeProject.name}
        </span>
      )}

      {droppedProject && (
        <div
          className={`absolute inset-0 flex items-center justify-center
            transition-all duration-300 ease-out
            ${isOver ? "blur-sm opacity-60" : "blur-0 opacity-100"}
          `}
        >
          <DraggableExpanded
            project={droppedProject}
            className="max-w-[100%] max-h-[100%]"
          />

        </div>
      )}
    </div>
  );
};

const SortableProject: React.FC<{ project: Project; viewed?: boolean }> = ({ project, viewed }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div style={style}>
      <ProjectCard
        project={project}
        type="normal"
        attributes={attributes}
        listeners={listeners}
        setNodeRef={setNodeRef}
        viewed={viewed}
      />
    </div>
  );
};


const ProjectDefault: React.FC<ProjectProps> = ({ projects }) => {
  const [projectList, setProjectList] = useState(projects);
  const [droppedProjects, setDroppedProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [client, setClient] = useState(false);
  const [showProjectHelp, setShowProjectHelp] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const [viewedProjects, setViewedProjects] = useState<Record<string, boolean>>({});

  // Extract and organize tags by category
  const getTagCategories = (): TagCategory => {
    const categories: TagCategory = {};
    projects.forEach((project) => {
      (project.tags || []).forEach((tag: string) => {
        const [category, value] = tag.split(":");
        if (!categories[category]) {
          categories[category] = [];
        }
        if (!categories[category].includes(tag)) {
          categories[category].push(tag);
        }
      });
    });
    return categories;
  };

  const tagCategories = getTagCategories();

  // Filter projects based on selected tags
  const getFilteredProjects = (list: Project[]): Project[] => {
    if (selectedTags.size === 0) return list;

    return list.filter((project) => {
      const projectTags = new Set(project.tags || []);
      return Array.from(selectedTags).some((tag) => projectTags.has(tag));
    });
  };

  const filteredProjectList = getFilteredProjects(projectList);

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const clearFilters = () => {
    setSelectedTags(new Set());
  };

  useEffect(() => {
    setClient(true);
  }, []);

  const markViewed = (name: string) => {
    setViewedProjects((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    document.body.style.cursor = "grabbing";

    const id = event.active.id as string;
    // try to find the project in the list first, then in the drop zone
    const fromList = projectList.find((p) => p.name === id);
    if (fromList) {
      setActiveProject(fromList);
      return;
    }
    const fromDrop = droppedProjects.find((p) => p.name === id);
    if (fromDrop) setActiveProject(fromDrop);
  };

  const handleDragCancel = () => {
    document.body.style.cursor = "";
    setActiveProject(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    document.body.style.cursor = "";
    // Get dragged item and drop target
    const { active, over } = event;

    // If dropped outside any valid target, reset and exit
    if (!over) {
      setActiveProject(null);
      return;
    }

    // IDs of dragged item and drop target
    const activeId = active.id as string;
    const overId = over.id as string;

    // Check where the dragged item came from
    const draggedFromListIndex = projectList.findIndex((p) => p.name === activeId);
    const draggedFromDropIndex = droppedProjects.findIndex((p) => p.name === activeId);

    // Resolve the actual dragged project object
    const draggedProject =
      draggedFromListIndex >= 0
        ? projectList[draggedFromListIndex]
        : draggedFromDropIndex >= 0
          ? droppedProjects[draggedFromDropIndex]
          : null;

    // Safety check: nothing valid dragged
    if (!draggedProject) {
      setActiveProject(null);
      return;
    }

    /* ---------- DROP ZONE LOGIC ---------- */
    if (overId === "drop-zone") {

      markViewed(draggedProject.name);

      // Case 1: drop zone is empty → move project into it
      if (droppedProjects.length === 0) {
        if (draggedFromListIndex >= 0) {
          // Remove project from the list
          setProjectList((prev) => prev.filter((p) => p.name !== activeId));
        }
        // Place project into drop zone
        setDroppedProjects([draggedProject]);
        setActiveProject(null);
        return;
      }

      // Case 2: drop zone already has a project → swap
      const currentDropped = droppedProjects[0];

      if (draggedFromListIndex >= 0) {
        // Remove dragged project from list
        // Insert the previously dropped project back into its original position
        setProjectList((prev) => {
          const withoutDragged = prev.filter((p) => p.name !== activeId);
          const updated = [...withoutDragged];
          updated.splice(draggedFromListIndex, 0, currentDropped);
          return updated;
        });
      }
      // Dragging the same dropped project again = no structural change

      // Place dragged project into drop zone
      setDroppedProjects([draggedProject]);
      setActiveProject(null);
      return;
    }

    /* ---------- SORTABLE LIST LOGIC ---------- */

    // Find index of the item being dropped onto
    const overIndex = projectList.findIndex((p) => p.name === overId);
    if (overIndex === -1) {
      setActiveProject(null);
      return;
    }

    // Case 3: reorder inside the list
    if (draggedFromListIndex >= 0) {
      if (activeId !== overId) {
        setProjectList((prev) => {
          const oldIndex = prev.findIndex((p) => p.name === activeId);
          const newIndex = prev.findIndex((p) => p.name === overId);
          if (oldIndex === -1 || newIndex === -1) return prev;
          return arrayMove(prev, oldIndex, newIndex);
        });
      }
    }

    // Case 4: move project from drop zone back into the list
    else if (draggedFromDropIndex >= 0) {
      setProjectList((prev) => {
        const updated = prev.filter((p) => p.name !== draggedProject.name);
        updated.splice(overIndex, 0, draggedProject);
        return updated;
      });
      // Clear drop zone
      setDroppedProjects([]);
    }

    // Cleanup active drag state
    setActiveProject(null);
  };


  if (!client) return null;

  return (
    <div className="w-full bg-transparent rounded-lg -mt-1 py-3 px-4 flex flex-row">
      <ProjectFilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        selectedTags={selectedTags}
        tagCategories={tagCategories}
        onToggleTag={toggleTag}
        onClearFilters={clearFilters}
      />

      {/* Projects Section */}
      <div className="w-full bg-transparent rounded-lg py-3 px-4 flex flex-row">
        <div className="ml-[72] -mt-[9] absolute top-2 left-2 z-30 flex items-center gap-2">
          <button
            type="button"
            onMouseEnter={() => setShowProjectHelp(true)}
            onMouseLeave={() => setShowProjectHelp(false)}
            onFocus={() => setShowProjectHelp(true)}
            onBlur={() => setShowProjectHelp(false)}
            className="relative grid place-items-center w-5 h-5 rounded-full
                 border border-[rgba(255,255,255,0.10)]
                 bg-[rgba(0,0,0,0.25)]
                 hover:bg-[rgba(0,0,0,0.35)] transition"
            aria-label="Project info"
          >
            <FaCircleQuestion className="text-[12px] text-[var(--color-text-subtle)]" />

            {showProjectHelp && (
              <div className="absolute top-full left-0 mt-2 w-[350px] rounded-md bg-gray-800 text-gray-100 text-sm px-3 py-2 shadow-lg z-50 text-justify">
                Some projects have no deployment since the system needs a backend provider.

                <p className="mt-2">
                  Some projects have no commits due to a repository transfer.
                </p>

                <p className="mt-2">
                  Click the image to view it in full size.
                </p>
              </div>
            )}
          </button>
          {/* Filters button */}
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="ml-[63px] h-[30px] w-[99px] flex items-center gap-1 bg-[var(--color-mini-card)] text-[var(--color-text-main)] border border-[rgba(255,255,255,0.06)] text-xs rounded px-2 py-1 hover:border-[rgba(255,255,255,0.12)] transition"
            aria-label="Filters"
            title="Filters"
          >
            <span>🔍</span>

            <span className="hidden sm:inline">Filters</span>

            {selectedTags.size > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-500 text-white text-[10px] rounded">
                {selectedTags.size}
              </span>
            )}
          </button>
        </div>
        <DndContext
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={filteredProjectList.map((p) => p.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3 h-[500px] w-[245px] overflow-y-auto pr-2 scrollbar-hide border-r" style={{ borderColor: "rgba(81, 86, 94, 0.3)" }}>
              {filteredProjectList.map((project) => (
                <SortableProject key={project.name} project={project} viewed={!!viewedProjects[project.name]} />
              ))}
            </div>
          </SortableContext>

          <DragOverlay modifiers={[snapCenterToCursor]}>
            {activeProject ? (
              <div className="pointer-events-none w-[236px]">
                <ProjectCard project={activeProject} type="normal" />
              </div>
            ) : null}
          </DragOverlay>

          <DropZone droppedProject={droppedProjects[0]} activeProject={activeProject} />
        </DndContext>
      </div>
    </div>
  );
};


export default ProjectDefault;

