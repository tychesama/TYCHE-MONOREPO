"use client";
import React, { useState, useEffect } from "react";
import { DndContext, DragOverlay, pointerWithin, useDroppable, useDraggable } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProjectCard from "../common/ProjectCard";

interface Project {
  name: string;
  description: string;
  link: string;
  images?: string[];
  color: string;
  repo: string;
  user: string;
}

interface ProjectProps {
  projects: Project[];
}

interface DropZoneProps {
  droppedProject?: Project;
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
    // trigger fade-in after mount
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
      className={`ml-5 relative flex-1 rounded-xl min-h-[310px] transition-colors duration-300 
        ${droppedProject
          ? "border-none"
          : isOver
            ? "border-2 border-[var(--color-accept)] bg-[var(--color-primary)/10]"
            : "border-2 border-dashed border-[var(--color-primary)]"
        } flex items-center justify-center`}
    >
      {!droppedProject && !isOver && (
        <span className="absolute inset-0 flex items-center justify-center text-[var(--color-text-subtle)] text-base font-medium">
          Drop Here
        </span>
      )}

      {isOver && !droppedProject && activeProject && (
        <div className="absolute w-full h-full flex items-center justify-center opacity-50">
          <ProjectCard project={activeProject} type="expanded" className="w-full h-full" />
        </div>
      )}

      {droppedProject && (
        <div
          className={`absolute inset-0 flex items-center justify-center`}
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

const SortableProject: React.FC<{ project: Project }> = ({ project }) => {
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
      />
    </div>
  );
};


const ProjectDefault: React.FC<ProjectProps> = ({ projects }) => {
  const [projectList, setProjectList] = useState(projects);
  const [droppedProjects, setDroppedProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveProject(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const draggedFromListIndex = projectList.findIndex((p) => p.name === activeId);
    const draggedFromDropIndex = droppedProjects.findIndex((p) => p.name === activeId);
    const draggedProject =
      draggedFromListIndex >= 0
        ? projectList[draggedFromListIndex]
        : draggedFromDropIndex >= 0
          ? droppedProjects[draggedFromDropIndex]
          : null;

    if (!draggedProject) {
      setActiveProject(null);
      return;
    }

    /* ---------- Dropped into the drop zone (swap semantics) ---------- */
    if (overId === "drop-zone") {
      // if drop-zone is empty -> move dragged item into it
      if (droppedProjects.length === 0) {
        if (draggedFromListIndex >= 0) {
          // remove from list
          setProjectList((prev) => prev.filter((p) => p.name !== activeId));
        }
        setDroppedProjects([draggedProject]);
        setActiveProject(null);
        return;
      }

      // drop-zone already has something -> swap
      const currentDropped = droppedProjects[0];

      if (draggedFromListIndex >= 0) {
        // remove dragged from list and insert the previously-dropped project at the dragged item's index
        setProjectList((prev) => {
          const withoutDragged = prev.filter((p) => p.name !== activeId);
          const updated = [...withoutDragged];
          // insert the swapped project back at the original index (keeps order stable)
          updated.splice(draggedFromListIndex, 0, currentDropped);
          return updated;
        });
      } else if (draggedFromDropIndex >= 0) {
        // dragging the dropped item onto the drop zone again — treat as no-op or replace
        // we'll simply replace
      }

      // new dropped becomes the dragged project
      setDroppedProjects([draggedProject]);
      setActiveProject(null);
      return;
    }

    /* ---------- Dropped onto the sortable list (reorder or insert) ---------- */
    const overIndex = projectList.findIndex((p) => p.name === overId);
    if (overIndex === -1) {
      setActiveProject(null);
      return;
    }

    // Reordering inside the list
    if (draggedFromListIndex >= 0) {
      if (activeId !== overId) {
        setProjectList((prev) => {
          const oldIndex = prev.findIndex((p) => p.name === activeId);
          const newIndex = prev.findIndex((p) => p.name === overId);
          if (oldIndex === -1 || newIndex === -1) return prev;
          return arrayMove(prev, oldIndex, newIndex);
        });
      }
    } else if (draggedFromDropIndex >= 0) {
      // Inserting an item that was in the drop zone into the list
      setProjectList((prev) => {
        const updated = prev.filter((p) => p.name !== draggedProject.name);
        updated.splice(overIndex, 0, draggedProject);
        return updated;
      });
      // clear drop zone
      setDroppedProjects([]);
    }

    setActiveProject(null);
  };

  if (!client) return null;

  return (
    <div className="w-full bg-transparent rounded-lg -mt-2 py-3 px-4 flex flex-row">
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projectList.map((p) => p.name)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3 h-[500px] w-[245px] overflow-y-auto pr-2 scrollbar-hide border-r" style={{ borderColor: "rgba(81, 86, 94, 0.3)" }}>
            {projectList.map((project) => (
              <SortableProject key={project.name} project={project} />
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
  );
};


export default ProjectDefault;

