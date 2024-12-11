import React, { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [block, setBlock] = useState([
    { id: 1, items: ["Apple", "Mango", "Banana"] },
    { id: 2, items: [] },
  ]);

  const [restoredItems, setRestoredItems] = useState([]);
  const [element, setElement] = useState("");
  const [blockNumber, setBlockNumber] = useState(0);

  const moveForward = (blockIndex, itemIndex) => {
    try {
      const newBlocks = [...block];
      if (blockIndex === block.length - 1 && newBlocks[0].items.length < 3) {
        const [item] = newBlocks[blockIndex].items.splice(itemIndex, 1);
        newBlocks[0].items.push(item);
        toast.success("item is pushed in the first block");
      } else if (blockIndex < block.length - 1) {
        const [item] = newBlocks[blockIndex].items.splice(itemIndex, 1);
        if (newBlocks[blockIndex + 1].items.length < 3) {
          newBlocks[blockIndex + 1].items.push(item);
          toast.success("Item is pushed to the next block.");
        } else {
          toast.error("Next block is full. Cannot move forward.");
          newBlocks[blockIndex].items.push(item);
        }
      } else {
        toast.error("first block is fulled ");
      }
      setBlock(newBlocks);
    } catch (err) {
      console.log("Something Got Issue While Moving-Forward : " + err.message);
    }
  };

  const moveBackward = (blockIndex, itemIndex) => {
    try {
      const newBlocks = [...block];

      const [item] = newBlocks[blockIndex].items.splice(itemIndex, 1);

      if (blockIndex === 0) {
        if (newBlocks[newBlocks.length - 1].items.length < 3) {
          newBlocks[newBlocks.length - 1].items.push(item);
        } else {
          toast.error("Last block is full. Cannot move item.");
          newBlocks[blockIndex].items.push(item);
        }
      } else {
        if (newBlocks[blockIndex - 1].items.length < 3) {
          newBlocks[blockIndex - 1].items.push(item);
          toast.success("Item Is Moved to the previous block");
        } else {
          toast.error("Previous block is full. Cannot move item.");
          newBlocks[blockIndex].items.push(item);
        }
      }
      setBlock(newBlocks);
    } catch (err) {
      console.log("Something Went Wrong While Moving Backward: " + err.message);
    }
  };

  const deleteItem = (blockIndex, itemIndex) => {
    try {
      const newBlocks = [...block];
      const [deletedItem] = newBlocks[blockIndex].items.splice(itemIndex, 1);
      setBlock(newBlocks);
      if (deletedItem) {
        setRestoredItems((prevItems) => [
          ...prevItems,
          { item: deletedItem, blockIndex },
        ]);
        toast.error("item goes in restore block");
      }
    } catch (err) {
      console.log(
        "Something Got Isuue While Deleting The Element : " + err.message
      );
    }
  };

  const restoreItem = (index) => {
    try {
      const itemToRestore = restoredItems[0];
      const newBlocks = [...block];
      if (!itemToRestore) {
        toast.error("Item to restore is not found");
        return;
      }
      if (newBlocks[itemToRestore.blockIndex].items.length < 3) {
        newBlocks[itemToRestore.blockIndex].items.push(itemToRestore.item);
        setBlock(newBlocks);
        const newRestoreItems = [...restoredItems];
        newRestoreItems.splice(index, 1);
        setRestoredItems(newRestoreItems);
        toast.success("Item Restored Successfully !!!");
      } else {
        toast.error("can not restore item because same block is fulled");
      }
    } catch (err) {
      console.log(
        "Sometghing Got issue While Restoring Element : " + err.message
      );
    }
  };

  function addBlock() {
    try {
      block.length < 7
        ? setBlock([...block, { id: block.length + 1, items: [] }])(
            toast.success("New Block Added !!")
          )((document.getElementById("addBtn").style.display = "block"))
        : (document.getElementById("addBtn").style.display = "none");
    } catch (err) {
      console.log("Something Got Issue While Adding Block : " + err.message);
    }
  }

  function removeBlock() {
    block.length > 0
      ? setBlock(block.slice(0, block.length - 1))(
          (document.getElementById("addBtn").style.display = "block")
        )
      : (document.getElementById("rmvBtn").style.display = "none");
  }

  const moveElement = () => {
    const newBlocks = [...block];
    const newEl = { item: element };

    const index = block.findIndex((block) => block.id === Number(blockNumber));

    if (newEl.item === "") {
      toast.error("Cannot Empty Element Field !!");
    } else if (index + 1 !== Number(blockNumber)) {
      toast.error("Block Doesn't Exsist !!");
    } else if (index !== -1 && newBlocks[index].items.length < 3) {
      newBlocks[index].items.push(newEl.item);
      setBlock(newBlocks);
    } else {
      toast.error("Block is fulled with Item !! ");
    }
  };

  return (
    <div className=" grid grid-flow-row gap-4 w-full h-screen bg-cyan-700 text-white place-content-center overflow-auto">
      {block?.length > 1 ? (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={removeBlock}
          id="rmvBtn"
        >
          Remove Block
        </button>
      ) : (
        ""
      )}

      <div className="flex gap-4">
        <div
          id="restoreBlock"
          className="w-60 h-auto border-2 bg-green-600 text-center rounded-3xl p-4"
        >
          <h2 className="text-xl font-bold">Restored Items</h2>
          <ul className="list-none">
            {restoredItems.map((restored, index) => (
              <li
                key={index}
                className="mb-4 text-blue-800 bg-white p-2 rounded "
              >
                {restored.item}
                <div className="flex justify-center gap-2 mt-2">
                  <button
                    className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                    onClick={restoreItem}
                  >
                    🔄
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {block.map((block, blockIndex) => (
          <div
            key={block.id}
            className="w-60 h-auto border-2 bg-green-600 text-center rounded-3xl p-4"
            id="resBlock"
          >
            <h2 className="text-white mb-4">Block {block.id}</h2>
            <ul className="list-none">
              {block.items.map((item, itemIndex) => (
                <li
                  key={item}
                  className="mb-4 text-blue-800 bg-white p-2 rounded"
                >
                  {item}
                  <div className="flex justify-center gap-2 mt-2">
                    {/* Backward Button */}
                    <button
                      className="text-white bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                      onClick={() => moveBackward(blockIndex, itemIndex)}
                      disabled={blockIndex === 0 && block.length === 1}
                      id="backBtn"
                    >
                      ←
                    </button>

                    <button
                      className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                      onClick={() => moveForward(blockIndex, itemIndex)}
                      disabled={blockIndex === block.length - 1}
                    >
                      →
                    </button>

                    {/* Delete Button */}
                    <button
                      className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                      onClick={() => deleteItem(blockIndex, itemIndex)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={addBlock}
        id="addBtn"
      >
        Add Block
      </button>
      <div className="flex flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Enter Element"
          className="rounded-full h-10 p-3 text-black font-bold"
          onChange={(e) => setElement(e.target.value)}
          id="inputEle"
        />
        <input
          type="Number"
          placeholder="Enter Block Number "
          className="rounded-full h-10 p-3 text-black font-bold"
          id="inputNum"
          onChange={(e) => setBlockNumber(e.target.value)}
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          id="inputNum"
          onClick={moveElement}
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default App;
