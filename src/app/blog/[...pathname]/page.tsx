export default function Blog({
	params, // tu można od razu destrukturyzację jeśli jest więcej niż jedna param przy rozpisaniu tego w plikach
}: {
	params: { pathname: string[] };
}) {
	return <div>{params.pathname?.join("/")} ?? []</div>; //optional chaining
}
