"use client";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest: string };
}) {
	<div className="">Error {error.digest}</div>;
}
