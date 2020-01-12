export function fetchSubmission() {
  return {
    id: 2020,
    title: "My huge problem",
    description: "Sample description",
    rating: 1,
    author: "Anonymous",
    tags: ["dasdsa", "das531", "dasdsa2"],
    comments: [
      {
        author: "ADMIN",
        text: "dasdsa"
      },
      {
        author: "Anonymous",
        text: "ashdjskm,x"
      }
    ],
    solutions: [
      {
        title: "solutoon1",
        description: "assadaskjdalkklskl",
        author: "aaaaa",
        rating: 0,
        comments: [
          {
            author: "Joe",
            text: "sad ksad lksadlkas,x"
          },
          {
            author: "Mike",
            text: "ashdjskm,x"
          }
        ]
      }
    ]
  };
}
