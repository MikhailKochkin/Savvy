import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPDATE_STATEMENT_MUTATION = gql`
  mutation UPDATE_STATEMENT_MUTATION($answered: Boolean, $id: String!) {
    updateStatementChecked(answered: $answered, id: $id) {
      id
    }
  }
`;

const CheckStatement = (props) => {
  const [checked, setChecked] = useState(false);

  const [updateStatementChecked, { data, loading }] = useMutation(
    UPDATE_STATEMENT_MUTATION
  );
  return (
    <div>
      {!checked && (
        <button
          onClick={async (e) => {
            const data = updateStatementChecked({
              variables: {
                id: props.id,
                answered: true,
              },
            });
            setChecked(true);
            alert("Отправлено!");
          }}
        >
          Отметить как 'провереннное'
        </button>
      )}
      {checked && <div>Проверили!</div>}
    </div>
  );
};

export default CheckStatement;
