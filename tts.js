const HF_TOKEN = "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";

async function speakTaiwanese() {

  const text =
    document.getElementById("tts-text")
      .innerText
      .trim();

  if (!text) {
    alert("沒有文字");
    return;
  }

  try {

    const btn =
      document.querySelector(".play-btn");

    btn.disabled = true;
    btn.innerText = "產生語音中...";

    const response =
      await fetch(
        "https://api-inference.huggingface.co/models/facebook/mms-tts-nan",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${HF_TOKEN}`,
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            inputs: text
          })
        }
      );

    if (!response.ok) {
      throw new Error(
        await response.text()
      );
    }

    const blob =
      await response.blob();

    const url =
      URL.createObjectURL(blob);

    const audio =
      new Audio(url);

    audio.play();

  } catch (err) {

    console.error(err);

    alert(
      "語音產生失敗"
    );

  } finally {

    document
      .querySelector(".play-btn")
      .disabled = false;

    document
      .querySelector(".play-btn")
      .innerText =
      "▶ 播放閩南語";

  }

}