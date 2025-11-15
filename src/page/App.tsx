
function App() {


  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center">
      < div className="flex justify-between" >
        <div className="text-white  text-5xl font-medium">Понедельник, 2 марта | 10:26</div>
        <div className="text-white text-5xl flex">
          <img src="./sun.svg" alt="sun" />-1
        </div>
      </div >

      <div className="grid grid-cols-[70%_28%] gap-4">
        <div className=" border rounded-xl border-[rgba(255,255,255,0.05)]">
          <img className="w-full h-full object-cover min-h-[300px]" src="./video.svg" />
        </div>
        <div className="text-white rounded-xl bg-[rgba(255,255,255,0.05)] p-5">
          <div className="text-3xl font-medium pb-5">10:35 – 12:10</div>
          <div className="relative">
            <div className="bg-linear-to-r rounded-xl from-[#ADC6FF33] from-35% to-[#ADC6FF1A] p-2 pb-10 bg-opacity-1">
              <div className="text-font text-2xl font-bold">111</div>
              <div className="">Математический анализ</div>
              <div className="absolute top-0 right-0 bg-black/20 rounded-bl-xl rounded-tr-xl px-2 py-1 text-sm">932420</div>
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

export default App
