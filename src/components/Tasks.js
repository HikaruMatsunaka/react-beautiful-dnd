import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./Card";

const Tasks = () => {
  const [data, setData] = useState(dummyData);

  const onDragEnd = (result) => {
    console.log(result);
    console.log(result.source);
    console.log(result.destination);
    const { destination, source } = result;

    if (source.droppableId !== destination.droppableId) {
      //元のdroppableIDから移動先のIDに変更する
      //elseと同様に元のdroppableIDの部分を削除して、新しいIDの場所へ追加する。
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      //元のindexのタスク配列を代入
      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];
      //移動した元のタスクを削除
      const [removed] = sourceTask.splice(source.index, 1);
      //移動先のタスクを追加
      destinationTask.splice(destination.index, 0, removed);
      //引っ張ってきたオブジェクトのtasks配列を置き換える
      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      setData(data);
    } else {
      //元のdroppableIdと一致する配列の番号を持ってくる。
      //例えば、元の0番目のidが"abcdefg"で、配列の2番目のidが"abcdefg"だったら、"2"を取ってくる。
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourceCol = data[sourceColIndex];

      //元のindexのタスク配列を代入
      const sourceTask = [...sourceCol.tasks];
      //移動した元のタスクを削除
      const [removed] = sourceTask.splice(source.index, 1);
      //移動先のタスクを追加
      sourceTask.splice(destination.index, 0, removed);
      //引っ張ってきたオブジェクトのtasks配列を置き換える
      data[sourceColIndex].tasks = sourceTask;
      setData(data);
    }
  };

  //{/**以下、react-beautiful-dndのドキュメントに従う */}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((a) => (
          <Droppable key={a.id} droppableId={a.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{a.title}</div>
                <div className="trello-section-content">
                  {a.tasks.map((b, index) => (
                    <Draggable draggableId={b.id} index={index} key={b.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card>{b.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
