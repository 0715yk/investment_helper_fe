// 쿠키에서 특정 쿠키 값을 가져오는 함수
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
