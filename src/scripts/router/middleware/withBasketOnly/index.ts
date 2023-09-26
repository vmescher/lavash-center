import {Middleware} from '@scripts/router/middleware/types';
import useBasketStore from "@scripts/store/basket";
import {RouteNames} from "@scripts/router/types";

const withBasketOnly: Middleware = ({next, abort}) => {
	const basketStore = useBasketStore();

	if (basketStore.basket.length) {
		next();
	} else {
		basketStore.requestBasket()
			.then((response) => {
				if (response.length) {
					next();
				} else {
					abort({name: RouteNames.MAIN_PAGE});
				}
			}).catch(() => {
				abort({name: RouteNames.MAIN_PAGE});
			});
	}
};

export default withBasketOnly;
