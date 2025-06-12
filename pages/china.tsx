import { useEffect } from 'react';
import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';

export async function getStaticProps() {
  const credentialsPath = path.join(process.cwd(), 'opproject-459908-credentials.json');
  const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1GzykJ0MZpEXgZBnroEg0XpzT8_MEjArgyEnIC_hQDwQ';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'コメント用!A1',
  });

  const comment = response.data.values?.[0]?.[0] ?? 'コメントが見つかりませんでした';

  return {
    props: {
      comment,
    },
    revalidate: 60,
  };
}

export default function ChinaPage({ comment }: { comment: string }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://e.infogram.com/js/dist/embed-loader-min.js';
    script.async = true;
    script.id = 'infogram-async';
    document.body.appendChild(script);

    return () => {
      document.getElementById('infogram-async')?.remove();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">訪日中国人数の推移</h1>

      {/* ✅ Hydration-safe: クライアント側のみで埋め込む */}
      <div
        className="infogram-embed"
        data-id="_/eWNhHjBxtMNjwWupHu5s"
        data-type="interactive"
        data-title=""
      ></div>

      <div className="mt-4">
        <p>{comment}</p>
      </div>
    </div>
  );
}
