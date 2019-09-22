import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

const List = props => {
  return (
    <ul className="users_list">
      {props.users.map((user, index) => (
        <li className="person" key={index}>
          <p className="title">{user.name.title}</p>
          <p className="name">{user.name.first}</p>
          <img src={user.picture.medium} alt="user profile" />
          <p className="city">{user.location.city}</p>
          <p className="age">{user.dob.age}</p>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

/*   .filter(user => {
          return user.location.city.includes(this.state.city);
        }) */

export default List;
