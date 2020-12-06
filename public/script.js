// SOURCE
// https://medium.com/@koteswar.meesala/convert-array-buffer-to-base64-string-to-display-images-in-angular-7-4c443db242cd

const input = document.querySelector("input");
document
	.querySelector("button")
	.addEventListener("click", () =>
		main(input.value.trim()).catch((err) => console.error(err))
	);

async function main(url) {
	const img = document.getElementById("img");
	const buffer = await request(url); // test: "https://img2.gelbooru.com/images/25/c0/25c054e93becb903b34c7bdbd35313cc.gif"

	// buffer to byte array.
	const byteArray = new Uint8Array(buffer.data);
	/*
  Use the String.fromCharCode() method to convert the Unicode values into a string of characters. As the fromCharCode() method accepts only arguments list instead of arguments array, we can make clever usage of the apply method to pass the typed array as a list of arguments.

  const charString = String.fromCharCode.apply(null, byteArray);

  NOTE: If your facing “out of range” error, use the reduce method on the byteArray to convert the buffer in small chunks.
  */

	const charString = byteArray.reduce((data, byte) => {
		return data + String.fromCharCode(byte);
	}, "");

	// base-64 encoded ASCII string.
	const base64String = btoa(charString);
	img.src = "data:image/jpeg;base64," + base64String;
}

async function request(url) {
	const res = await fetch("/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			url,
		}),
	});
	return res.json();
}
