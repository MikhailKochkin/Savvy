import { YMInitializer } from "react-yandex-metrika";

class YM extends React.Component {
  render() {
    return (
      <div>
        // SNIP
        <YMInitializer
          accounts={[52361302]}
          options={{ webvisor: true }}
          version="2"
        />
        // SNIP
      </div>
    );
  }
}

export default YM;
