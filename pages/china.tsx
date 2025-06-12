import React from "react";

const ChinaPage = () => {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>訪日中国人数の推移</h1>
      <iframe
        title="訪日中国人グラフ"
        width="100%"
        height="600"
        src="https://e.infogram.com/1pg2n932znqe3wf9mvelrnmvj3c2pvgxxl?src=embed"
        allowFullScreen
      ></iframe>
      <p style={{ marginTop: "1rem" }}>
        コロナ前の2019年には訪日中国人数が約960万人と過去最高を記録しました。
        一方で、2023年は約240万人と、依然として回復の途上にあります。
      </p>
    </main>
  );
};

export default ChinaPage;
