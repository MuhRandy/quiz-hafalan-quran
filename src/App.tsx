import Quiz from './components/Quiz';
import Card from './components/Card';

function App() {
  return (
    <main className="mx-10 mt-5 flex flex-col gap-5">
      <Card>
        <Card.Title title="Selamat Datang diwebsite Hafalan Qur'an Sederhana" />
        <Card.Text>Silahkan pilih jumlah soal :</Card.Text>
      </Card>
      <Quiz />
    </main>
  );
}

export default App;
