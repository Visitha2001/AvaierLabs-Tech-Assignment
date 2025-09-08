import { Button } from "./components/ui/button"

function App() {

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">App</h1>
          <p className="text-green-500">App</p>
          <Button>Button</Button>
        </div>
      </div>
    </>
  )
}

export default App