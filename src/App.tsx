import { Provider } from "react-redux";
import ContactList from "./components/contactList";
import ChatWindow from "./components/chatWindow";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <ContactList />
        <ChatWindow />
      </div>
    </Provider>
  );
};

export default App;
