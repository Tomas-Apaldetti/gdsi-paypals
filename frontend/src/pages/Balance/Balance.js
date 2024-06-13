
import { getTickets } from 'services/tickets';
import { getGroupMembers } from 'services/groups';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

const LeftToPayToolTip = ({ leftToPayTickets = [] }) => {
  return (
    <div className='flex flex-col p-4 gap-2 w-full'>
      {leftToPayTickets.map((ticket) => (
        <div className='flex w-64 justify-between'>
          <div>{ticket.name}</div>
          <div>{ticket.balanceForTicket.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

const UserBalance = ({ name, amount, ticketsLeftToPay }) => {
  return (
    <Tooltip title={<LeftToPayToolTip leftToPayTickets={ticketsLeftToPay}/>}>
      <div className='flex w-full justify-between'>
        <div className='font-extrabold'>{name}</div>
        <div className={'font-extrabold ' + (amount < 0 ? 'text-red-800' : 'text-lime-600')} >{Math.abs(amount)}</div>
      </div>
    </Tooltip>
  )
}

const Balance = ({ queryParamGroup }) => {
  const [tickets, setTickets] = useState([])
  const [usersOnGroup, setUsersOnGroup] = useState([])

  const _getTickets = async () => {
      const response = await getTickets(queryParamGroup);
      const data = await response.json()
      setTickets(data)
  };

  const _getGroupMembers = async () => {
    const response = await getGroupMembers(queryParamGroup)
    const data = await response.json()
    setUsersOnGroup(data)
  }

  const calculateBalances = () => {
    const ticektsBalances = usersOnGroup?.map((x) => {
      const userId = x.id
      const balanceForUser = tickets?.map((ticket) => {
        const debtOnTicket = ticket.debtors.find((usersOnTicket) => String(usersOnTicket._id) === String(userId))
        const paysOnTicket = ticket.payments.find((usersOnTicket) => String(usersOnTicket.from._id) === String(userId))
        const waivedOnTicket = ticket.waivers.find((usersOnTicket) => String(usersOnTicket.to._id) === String(userId))

        let amountToPay = 0
        if (debtOnTicket && !waivedOnTicket) {
          amountToPay = debtOnTicket.amount
        } 
        
        let amountPayed = 0
        if (paysOnTicket) {
          amountPayed = paysOnTicket.amount
        }
       
        const balanceForTicket = amountPayed - amountToPay
        return { balanceForTicket, name: ticket.name }
      })

      return { 
        name: x.username, 
        amount: balanceForUser.reduce((acc, x) => acc + x.balanceForTicket, 0).toFixed(2),
        ticketsLeftToPay: balanceForUser.filter(x => x.balanceForTicket < 0)
      }
    }) || []

    return ticektsBalances
  }

  useEffect(() => {
    _getTickets()
    _getGroupMembers()
  }, [queryParamGroup])

  return usersOnGroup && usersOnGroup.length > 0 && (
    <div className='flex flex-col p-4 gap-2'>
      {calculateBalances().map(x => <UserBalance name={x.name} amount={x.amount} ticketsLeftToPay={x.ticketsLeftToPay}/>)}
    </div>
  )
}

export default Balance