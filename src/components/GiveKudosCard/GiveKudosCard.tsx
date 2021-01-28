import { ReactNode, useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";

import { AuthContext } from "../../context/authContext";
import { GIVE_KUDOS } from "../../pages/GiveKudos/graphql/giveKudos.mutations";
import { FETCH_ALL_TEAM_MEMBERS } from "../../pages/GiveKudos/graphql/giveKudos.queries";

import {
  StyledContainer,
  StyledPageTitle,
  StyledFormContainer,
  StyledForm,
  StyledFieldLabel,
  StyledField,
  StyledErrorMessage,
} from "../../pages/shared/styles";

interface ITeamMember {
  id: string;
  fullName: string;
  imageUrl: string;
}

const GiveKudosSchema = Yup.object().shape({
  body: Yup.string().required(
    "Don't be shy, tell that person what you're grateful for!"
  ),
});

const GiveKudosCard = () => {
  const [backendErrors, setBackendErrors] = useState({});
  const [formValues, setFormValues] = useState({
    forWhom: "",
    body: "",
  });

  const { user } = useContext(AuthContext);

  const [giveKudos, { loading }] = useMutation(GIVE_KUDOS, {
    onError(err) {
      console.log(err);

      if (err.graphQLErrors[0].extensions) {
        console.log(err.graphQLErrors[0].extensions.exception.errors);
        setBackendErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables: formValues,
  });

  const {
    loading: loadingFetchAllTeamMembers,
    data: { getAllTeamMembers: teamMembers } = {},
  } = useQuery(FETCH_ALL_TEAM_MEMBERS);

  const teamMembersFullNames = loadingFetchAllTeamMembers
    ? []
    : teamMembers.map((teamMember: ITeamMember) => teamMember.fullName);

  return (
    <div>
      <StyledPageTitle>Give kudos</StyledPageTitle>
      {user ? (
        <StyledContainer>
          {loading ? (
            "Loading"
          ) : (
            <>
              <StyledFormContainer>
                <Formik
                  initialValues={{
                    forWhom: "",
                    body: "",
                  }}
                  validationSchema={GiveKudosSchema}
                  onSubmit={(values) => {
                    setFormValues(values);
                    giveKudos();
                  }}
                >
                  <StyledForm component={<Form />}>
                    <StyledFieldLabel>Kudos to: </StyledFieldLabel>
                    <StyledField
                      component={<Field name="forWhom" as="select" />}
                    >
                      <option defaultValue="default">Choose a person</option>
                      {teamMembersFullNames.map((fullName: string) => (
                        <option key={fullName} value={fullName}>
                          {fullName}
                        </option>
                      ))}
                    </StyledField>
                    <StyledErrorMessage
                      component={
                        <ErrorMessage component="div" name="forWhom" />
                      }
                    />
                    <StyledFieldLabel>Kudos message: </StyledFieldLabel>
                    <StyledField
                      component={<Field name="body" type="text" />}
                    />
                    <StyledErrorMessage
                      component={<ErrorMessage component="div" name="body" />}
                    />

                    <button type="submit">Give kudos</button>
                  </StyledForm>
                </Formik>
              </StyledFormContainer>
            </>
          )}
          {Object.keys(backendErrors).length > 0 && (
            <div>
              <ul>
                {Object.values(backendErrors).map((value) => (
                  <li>{value as ReactNode}</li>
                ))}
              </ul>
            </div>
          )}
        </StyledContainer>
      ) : (
        <div>You have to be logged in</div>
      )}
    </div>
  );
};

export default GiveKudosCard;
