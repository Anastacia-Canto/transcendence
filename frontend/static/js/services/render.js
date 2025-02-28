import { Navbar } from "/static/js/components/index.js";
import { Dashboard, Home, SignIn, SignUp } from "/static/js/pages/index.js";

const ROUTES = [
	{ path: "/", title: "Home", page: Home },
	{ path: "/sign-up", title: "Sign-up", page: SignUp },
	{ path: "/sign-in", title: "Sign-in", page: SignIn },
	{ path: "/dashboard", title: "Dashboard", page: Dashboard }
];

const doesPathMatch = (path) => {
	const regex = new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

	return (location.pathname.match(regex) !== null)
};

const renderPage = async () => {
	let thisRoute = ROUTES.find(route => doesPathMatch(route.path));

	if (!thisRoute) {
		thisRoute = ROUTES[0];
	}

	const page = new thisRoute.page({ title: thisRoute.title });

	const navbar = new Navbar();
	document.querySelector("#navbar").innerHTML = await navbar.getHtml();

	document.querySelector("#app").innerHTML = await page.getHtml();
	document.title = thisRoute.title;

	page.addFunctionality();
};

export default renderPage;
