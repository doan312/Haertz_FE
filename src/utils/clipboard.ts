export const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("주소가 복사되었습니다!");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("주소 복사에 실패했습니다.");
    }
  };
