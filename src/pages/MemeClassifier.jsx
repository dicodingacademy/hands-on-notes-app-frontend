import { useState } from 'react';

import { classifyMeme } from '../utils/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';

function MemeClassifier() {
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const { token } = useAuth();

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });

    setStatus('loading');
    setPredictions([]);
    setErrorMsg('');
    
    try {
      const result = await classifyMeme({ file, token });
      setPredictions(result);
      setStatus('idle');
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }

  return (
    <main className="page">
      <h1>Cek Template Meme</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Pratinjau gambar"
          style={{ display: 'block', maxWidth: '300px', marginTop: '1rem' }}
        />
      )}
      {status === 'loading' && <p>Memproses gambar, mohon tunggu...</p>}
      {status === 'error' && <p className="error">Gagal: {errorMsg}</p>}
      {predictions.length > 0 && (
        <ul>
          {predictions.map((p) => (
            <li key={p.label}>
              {p.label}: {(p.confidence * 100).toFixed(1)}%
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MemeClassifier;
