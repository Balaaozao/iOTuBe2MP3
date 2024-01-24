 import axios from "axios";
 import { useRef, useState } from "react";
 import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="app">
      <span className="logo">iOTuBe 2 mp3</span>
      <section className="content">
        <h1 className="content_title">Conversor Abençoado pelo Pai</h1>
        <p className="content_description">
          Baixe músicas do iotube sem vírus bem daki
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="bote o link da muzika aki, desgraça..." className="form_input" type="text" />
          <button type="submit" className="form_button">Pricurá</button>
        </form>

        {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Abaixar o MP3</a> : ''}
        
      </section>
    </div>
  )
}

export default App