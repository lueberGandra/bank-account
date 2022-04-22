import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss'
import { actionCreators, State } from './state';

function App() {
  const [formData, setFormData] = useState({
    deposit: '',
    withdraw: ''
  })
  const dispatch = useDispatch()
  const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(actionCreators, dispatch)
  const amout = useSelector((state: State) => state.bank)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(data => ({ ...data, [name]: value }))

  }

  const handleDeposit = () => {
    depositMoney(parseFloat(formData.deposit))
    setFormData(data => ({ ...data, deposit: '' }))
  }

  const handleWithdraw = () => {
    withdrawMoney(parseFloat(formData.withdraw))
    setFormData(data => ({ ...data, withdraw: '' }))
  }

  const handleBankrupt = () => {
    bankrupt(0)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '+' || e.key === '-' || e.key === ',') {
      e.preventDefault();
    }
  };
  return (
    <div id="App">
      <div className='content'>
        <h1>LuBank</h1>
        <main>
          <div className='balanceWrapper'>
            <h4 title={`R$ ${amout.toString()}`}>R$ {amout}</h4>
            <h6>Saldo</h6>
          </div>
          <div className='actionsWrapper'>
            <div>
              <span>R$</span>
              <input
                type="number"
                value={formData.deposit}
                placeholder='Depósito'
                name='deposit'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className='depositBtn'
                disabled={formData.deposit === ''}
                onClick={handleDeposit}>+</button>
            </div>
            <div>
              <span>R$</span>
              <input
                type="number"
                value={formData.withdraw}
                placeholder='Saque'
                name='withdraw'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button
                className='withdrawBtn'
                disabled={formData.withdraw === ''}
                onClick={handleWithdraw}>-</button>
            </div>
            <div>
              <button className='bankruptBtn'
                onClick={handleBankrupt}
              >Falencia
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
