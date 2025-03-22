import { EntryPointNavigator } from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <EntryPointNavigator />
      </Provider>
    </QueryClientProvider>
  );
}
