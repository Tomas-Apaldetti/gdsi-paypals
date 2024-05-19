export const tickets = [
  {
    id: 1,
    name: "A ticket name",
    amount: 150,
    description: "Some description about the ticketSome description about the ticketSome description about the ticketSome description about the ticketSome description about the ticketSome description about the ticket",
    category: "home",
    debtors: [
      {
        id: 1,
        name: "Caro",
        amount: 10
      },
      {
        id: 2,
        name: "Tomas",
        amount: 100
      },
      {
        id: 3,
        name: "Fran",
        amount: 40
      }
    ],
    payments: [
      {
        id: 1,
        from: {
          id: 1,
          name: "Caro"
        },
        amount: 10
      },
      {
        id: 2,
        from: {
          id: 2,
          name: "Tomas",
        },
        amount: 50
      }
    ]
  }
]
