import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProtectedRoute (props) {
const { Component } = props;
const navigate = useNavigate();
useEffect (() => {
let login = localStorage.getItem('login');
if (!login) {
navigate('/')
}
});
return (
<div>
<Component />
</div>
)
}
export default ProtectedRoute;