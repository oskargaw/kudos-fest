import { ReactNode, useContext, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";

import { AuthContext } from "../../context/authContext";
import { GIVE_KUDOS } from "../../pages/GiveKudos/graphql/giveKudos.mutations";
import { FETCH_ALL_TEAM_MEMBERS } from "../../pages/GiveKudos/graphql/giveKudos.queries";

import {
  StyledContainer,
  StyledTitle,
  StyledFormContainer,
  StyledForm,
} from "../../pages/shared/styles";
import Dropdown from "../../components/Form/Dropdown";
import TextInput from "../../components/Form/TextInput";

interface ITeamMember {
  id: string;
  fullName: string;
  imageUrl: string;
}

const GiveKudosSchema = Yup.object().shape({
  forWhom: Yup.string().required("You need to choose a lucky person"),
  kudosMessage: Yup.string().required(
    "Don't be shy, tell that person what you're grateful for!"
  ),
});

const GiveKudosCard = () => {
  const [backendErrors, setBackendErrors] = useState({});
  const [formValues, setFormValues] = useState({
    forWhom: "",
    kudosMessage: "",
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

  const formik = useFormik({
    validationSchema: GiveKudosSchema,
    initialValues: {
      forWhom: "",
      kudosMessage: "",
    },
    onSubmit: (values) => {
      setFormValues(values);
      giveKudos();
    },
  });

  const { handleChange, handleBlur, errors, touched, values } = formik;

  return (
    <div>
      <StyledTitle>Give kudos</StyledTitle>
      {user ? (
        <StyledContainer>
          {loading ? (
            "Loading"
          ) : (
            <>
              <StyledFormContainer>
                <FormikProvider value={formik}>
                  <StyledForm>
                    <Dropdown
                      name="forWhom"
                      placeholder="Choose a lucky person"
                      options={teamMembersFullNames}
                      onChange={handleChange("forWhom")}
                      value={values.forWhom}
                      onBlur={handleBlur("forWhom")}
                      error={errors.forWhom}
                      touched={touched.forWhom}
                    />

                    <TextInput
                      name="kudosMessage"
                      type="text"
                      placeholder="Kudos message"
                      onChange={handleChange("kudosMessage")}
                      value={values.kudosMessage}
                      onBlur={handleBlur("kudosMessage")}
                      required={true}
                      error={errors.kudosMessage}
                      touched={touched.kudosMessage}
                    />

                    <button type="submit">Give kudos</button>
                  </StyledForm>
                </FormikProvider>
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
