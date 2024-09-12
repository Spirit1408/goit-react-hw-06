import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

export default function ContactForm() {
	const nameFieldId = useId();
	const phoneFieldId = useId();
	const phoneRegExp = /^\d{3}-\d{2}-\d{2}$/;
	const dispatch = useDispatch();

	const formSchema = Yup.object().shape({
		username: Yup.string()
			.min(2, "Name is too short")
			.max(50, "Name is too long")
			.required("Required!"),
		phone: Yup.string()
			.matches(phoneRegExp, "Phone number should be in format 000-00-00")
			.required("Required!"),
	});

	const handleAddContact = (values, actions) => {
		dispatch(
			addContact({
				id: nanoid(),
				name: values.username,
				number: values.phone,
			}),
		);

		actions.resetForm();
	};

	return (
		<Formik
			initialValues={{
				username: "",
				phone: "",
			}}
			onSubmit={handleAddContact}
			validationSchema={formSchema}
		>
			<Form className={css.form}>
				<div className={css.inputContainer}>
					<label htmlFor={nameFieldId}>Name</label>
					<Field
						className={css.input}
						type="text"
						name="username"
						id={nameFieldId}
					/>
					<ErrorMessage
						className={css.error}
						name="username"
						component="span"
					/>
				</div>

				<div className={css.inputContainer}>
					<label htmlFor={phoneFieldId}>Number</label>
					<Field
						className={css.input}
						type="phone"
						name="phone"
						id={phoneFieldId}
					/>
					<ErrorMessage className={css.error} name="phone" component="span" />
				</div>

				<button className={css.button} type="submit">
					Add contact
				</button>
			</Form>
		</Formik>
	);
}
