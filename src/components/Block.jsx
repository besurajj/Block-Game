import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const onDragEnd = (result) => {
  if (!result.destination) return;

  const items = Array.from(block);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setBlock(items);
};

// Inside the return JSX
<DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="blocks">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {block.map((block, index) => (
          <Draggable
            key={block.id}
            draggableId={`block-${block.id}`}
            index={index}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="w-60 h-auto border-2 bg-green-600 text-center rounded-3xl p-4 mb-4"
              >
                <h2 className="text-white mb-4">Block {block.id}</h2>
                {/* Block content here */}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>;
