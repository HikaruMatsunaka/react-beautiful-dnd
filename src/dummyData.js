import { v4 as uuidv4 } from "uuid";

const dummyData = [
  {
    id: uuidv4(),
    title: "🤚Not Started",
    tasks: [
      { id: uuidv4(), title: "実装1" },
      { id: uuidv4(), title: "実装2" },
      { id: uuidv4(), title: "実装3" }
    ]
  },
  {
    id: uuidv4(),
    title: "🏃‍♂️In progress",
    tasks: [
      { id: uuidv4(), title: "実装1" },
      { id: uuidv4(), title: "実装2" },
      { id: uuidv4(), title: "実装3" }
    ]
  },
  {
    id: uuidv4(),
    title: "🙆‍♀️Done",
    tasks: [
      { id: uuidv4(), title: "実装1" },
      { id: uuidv4(), title: "実装2" },
      { id: uuidv4(), title: "実装3" }
    ]
  }
];

export default dummyData;
