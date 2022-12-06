import type { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

export const renderWithRedux = (element: JSX.Element, store: ToolkitStore) => {
  render(<Provider store={store}>{element}</Provider>);
};
