import Image from "next/image";
import Link from "next/link";
import { getCollectionsList } from "@/api/collections";

export const CollectionsSections = async () => {
	const collections = await getCollectionsList();

	return (
		<section className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
			{collections.map((collection) => (
				<div key={collection.slug}>
					<Link
						href={`/collections/${collection.slug}`}
						className="relative flex flex-col items-center gap-2 md:gap-4"
					>
						<Image
							src={collection.image.url}
							alt={collection.name}
							width={300}
							height={300}
							className="h-full w-full rounded-sm text-slate-900"
						/>
						<div className="absolute left-0 top-0 z-10 flex h-full w-full items-end justify-center text-xl text-slate-700">
							<h3 className="w-full bg-white bg-opacity-60 p-4 text-right">
								{collection.name}
							</h3>
						</div>
					</Link>
				</div>
			))}
		</section>
	);
};
