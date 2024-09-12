import { useSelector } from "react-redux";
import Contact from "./Contact/Contact";
import css from "./ContactList.module.css";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

export default function ContactList() {
	const data = useSelector(selectContacts);
	const filter = useSelector(selectNameFilter);

	const filteredData = data.filter((contact) =>
		contact.name.toLowerCase().includes(filter.toLowerCase()),
	);

	return (
		<ul className={css.contactList}>
			{data.length === 0 ? (
				<p>No contacts</p>
			) : (
				filteredData.map((item) => (
					<li key={item.id}>
						<Contact data={item} />
					</li>
				))
			)}
		</ul>
	);
}
