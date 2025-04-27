import { useState } from 'react'
import {InputBox} from './component'
import useCurrency from './hook/usecinfo'


function App() {

const [amount,setamount] = useState(0)
const [from,setfrom] = useState("usd")
const [to,setto] = useState("inr")
const [convertedamount,setconamount] = useState(0)

const currencyinfo = useCurrency(from)
const options = Object.keys(currencyinfo) 

const swap = ()=>{
  setfrom(to)
  setto(from)
  setconamount(amount)
  setamount(convertedamount)
}

const convert = ()=>{
  setconamount(amount*currencyinfo[to])
}

return (
  <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
          backgroundImage: `url('https://images.pexels.com/photos/29421579/pexels-photo-29421579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
  >
      <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                     convert()
                  }}
              >
                  <div className="w-full mb-1">
                      <InputBox 
                          label="From"
                          amount={amount}
                          currencyoptions={options}
                          oncurrencychange={(currency)=>setamount(amount)}
                          selectcurrency={from}
                          onamountchange={(amount)=>setamount(amount)}
                      />
                  </div>
                  <div className="relative w-full h-0.5">
                      <button
                          type="button"
                          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5" 
                          onClick={swap}
                      >
                          swap
                      </button>
                  </div>
                  <div className="w-full mt-1 mb-4 ">
                      <InputBox 
                           label="To" 
                          amount={convertedamount}
                          currencyoptions={options}
                          oncurrencychange={(currency)=>setto(currency)}
                          selectcurrency={to}
                          amountdisable
                          
                      />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg ">
                      Convert {from.toUpperCase()} TO {to.toUpperCase()}
                  </button>
              </form>
          </div>
      </div>
  </div>
);
}

export default App
