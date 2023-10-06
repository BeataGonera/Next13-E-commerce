import { ImageResponse } from "next/server";
export const runtime = "edge";
export const contentType = "image/png";
export const size = {
	width: 1200,
	height: 630,
};

export const alt = "Open Graph Image";

export default function OpenGraphImage({}) {
	return new ImageResponse(<div>Halo</div>); //wyświetli się jako obrazek
}
