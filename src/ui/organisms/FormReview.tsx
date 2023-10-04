"use client";
import { submitReviewAction } from "@/app/cart/actions";
import { type FC, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormReviewProps = {
	productId: string;
};

export const FormReview: FC<FormReviewProps> = ({ productId }) => {
	const formStatus = useFormStatus();
	const submitReviewActionWithID = submitReviewAction.bind(
		null,
		productId,
	);

	const [rating, setRating] = useState<number>(5);

	return (
		<section className="flex flex-col gap-4">
			<h3>Add a review</h3>
			<form
				data-testid="add-review-form"
				className="flex flex-col gap-2"
				action={submitReviewActionWithID}
			>
				<input
					className="h-12 rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="text"
					placeholder="Title"
					name="title"
				/>
				<input
					className="h-12 rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="text"
					placeholder="Content"
					name="content"
				/>
				<select
					value={rating}
					name="rating"
					id="rating"
					className="h-12 rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					onChange={(e) => setRating(Number(e.currentTarget.value))}
				>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
				<input
					className="h-12 rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="text"
					placeholder="User name"
					name="username"
				/>
				<input
					className="h-12 rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="email"
					placeholder="Email"
					name="email"
				/>
				<button
					type="submit"
					disabled={formStatus.pending}
					className="h-10 w-36 cursor-pointer rounded-sm bg-blue-500 text-slate-50 hover:opacity-90"
				>
					Submit
				</button>
			</form>
		</section>
	);
};
