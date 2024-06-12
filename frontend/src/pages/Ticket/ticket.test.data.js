export const tickets = [
  {
    id: 1,
    name: "A ticket name",
    amount: 150,
    creator: "663b8fb9b7cdde00a35967ca",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id arcu turpis. Etiam scelerisque vulputate erat, nec vehicula eros ultricies eget. Sed et massa orci. Vivamus non gravida quam. Nam quis malesuada ipsum, ut luctus tortor. Nulla fringilla vel.",
    category: "home",
    debtors: [
      {
        _id: "663b8fb9b7cdde00a35967ca",
        username: "Caro",
        amount: 11
      },
      {
        _id: "663b8fb9b7cdde00a35967cb",
        username: "Tomas",
        amount: 100
      },
      {
        _id: "663b8fb9b7cdde00a35967cc",
        username: "Fran",
        amount: 40
      },
    ],
    payments: [
      {
        _id: 1,
        from: {
          _id: "663b8fb9b7cdde00a35967ca",
          username: "Caro"
        },
        amount: 10,
        note: "This a note for this payment",
        onDate: new Date().toString()
      },
      {
        _id: 2,
        from: {
          _id: "663b8fb9b7cdde00a35967cb",
          username: "Tomas",
        },
        amount: 50,
        onDate: new Date().toString()
      }
    ],
    waivers: [
      {
        _id: 3,
        to: {
          _id: "663b8fb9b7cdde00a35967cc",
          username: "Fran"
        },
        from: {
          _id: "663b8fb9b7cdde00a35967ca",
          username: "Caro"
        },
        note: "This is a note for a waiver",
        onDate: new Date().toString()
      }
    ]
  }
]
