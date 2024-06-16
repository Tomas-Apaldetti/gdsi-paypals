export function getUniqueDebtors(tickets){
  return Object.values(tickets
    .map(ticket => ticket.debtors)
    .flat()
    .reduce((users, curr) => {
      if(users[curr._id]){
        return users;
      }

      users[curr._id] = {
        username:curr.username,
        _id:curr._id
      }
      return users;
    }, {}));
}

export function hasWaiverFor(ticket, user){
  return !!ticket.waivers.find(w => w.to._id === user._id)
}

export function getDebtForUser(ticket, user){
  return ticket.debtors.find(d => d._id === user._id)?.amount || 0;
}

export function getTotalDebtForUser(tickets, user){
  return tickets.map(ticket => getDebtForUser(ticket, user)).reduce((acc, c) => acc + c, 0)
}

export function getPaidForUser(ticket, user){
  return ticket.payments.filter(payment => payment.from._id === user._id).reduce((acc, c) => acc + c.amount, 0)
}

export function getTotalPaidForUser(tickets,user){
  return tickets.map(t => getPaidForUser(t, user)).reduce((acc, c) => acc + c, 0)
}

export function getTicketsDissagg(tickets, user){
  return tickets.map(ticket => ({
    ...ticket,
    currUser: user,
    toPay: ticket.debtors.find(d => d._id === user._id).amount,
    paid: getPaidForUser(ticket, user)
  }));
}
