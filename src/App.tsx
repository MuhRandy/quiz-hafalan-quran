import Quiz from './components/Quiz';
import Card from './components/Card';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState<number[]>([0, 1]);
  return (
    <main className="mx-10 mt-5 flex flex-col gap-5">
      <Card>
        <Card.Title title="Selamat Datang diwebsite Hafalan Qur'an Sederhana" />
        <Card.Text>
          <div className="flex justify-between">
            <span>Silahkan pilih jumlah soal :</span>
            <input
              type="number"
              name="amount"
              min={1}
              className="max-w-[35px] p-0 text-center"
              defaultValue={1}
              onChange={(e) => {
                let newArr = [...amount];
                console.log(newArr);
                newArr[1] = Number(e.target.value);
                console.log(newArr);
                console.log(amount);
                setAmount(newArr);
                console.log(amount);
              }}
            />
          </div>
          <div>{amount}</div>
        </Card.Text>
      </Card>
      <Quiz />
    </main>
  );
}

export default App;
