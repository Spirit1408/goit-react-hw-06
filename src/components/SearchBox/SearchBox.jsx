import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { useId } from "react";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
	const searchInputId = useId();
	const dispatch = useDispatch();
	const filter = useSelector(selectNameFilter);

	const handleFilterChange = (e) => {
		dispatch(changeFilter(e.target.value));
	};

	return (
		<div className={css.searchBoxContainer}>
			<label htmlFor={searchInputId}>Find contacts by name</label>
			<input
				className={css.input}
				type="text"
				id={searchInputId}
				name="query"
				value={filter}
				onChange={handleFilterChange}
			/>
		</div>
	);
}
