export const tickets = [
  {
    id: 1,
    name: "A ticket name",
    value: {
      original: {
        currency: "Pesos",
        amount: 150
      },
      converted: {
        currency: "Pesos",
        amount: 150,
      }
    },
    description: "Some description about the ticketSome description about the ticketSome description about the ticketSome description about the ticketSome description about the ticketSome description about the ticket",
    category: "home",
    debtors: [
      {
        id: 1,
        name: "Caro",
        amount: {
          currency: "Pesos",
          amount: 10
        }
      },
      {
        id: 2,
        name: "Tomas",
        amount: {
          currency: "Pesos",
          amount: 100
        }
      },
      {
        id: 3,
        name: "Fran",
        amount: {
          currency: "Pesos",
          amount: 40
        }
      }
    ],
    payments: [
      {
        id: 1,
        from: {
          id: 1,
          name: "Caro"
        },
        amount: {
          currency: "Pesos",
          amount: 10
        }
      },
      {
        id: 2,
        from: {
          id: 2,
          name: "Tomas",
        },
        amount: {
          currency: "Pesos",
          amount: 50
        }
      }
    ]
  }
]
