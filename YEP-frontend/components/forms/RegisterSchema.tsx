import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function RegisterSchema({ msg }) {
    const router = useRouter()
    const [message, setMessage] = useState('')

    useEffect(() => {
        document.title = "Login | Meazay"
    })

    const schema = yup.object().shape({
        username: yup.string()
            .required("Veuillez indiquer un nom d'utilisateur")
            .min(4, "Votre nom d'utilisateur doit contenir au moins 4 caractères")
            .max(20, "Votre nom d'utilisateur doit contenir au maximum 20 caractères")
            .matches(/[a-zA-Z0-9]/, "Votre nom d'utilisateur ne peut contenir que des lettres et des chiffres"),
        password: yup.string()
            .required('Veuillez indiquer un mot de passe')
            .min(8, 'Votre mot de passe doit contenir au moins 8 caractères')
            .max(64, 'Votre mot de passe doit contenir au maximum 64 caractères'),
        mailaddr: yup.string()
            .required('Veuillez indiquer votre adresse mail')
            .email(),
    })

    async function registerHandler(values) {
        const payload = JSON.parse(JSON.stringify(values))
        const url     = '/register'
        const body    = {
            username: payload.username,
            password: payload.password,
            mailaddr: payload.mailaddr,
        }

        try {
            const res = await fetch(
                url,
                {
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            )

            if (res.redirected) {
                router.push('/home')
            } else {
                setMessage("Une erreur est survenue lors de l'inscription")
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                mailaddr: '',
                alphaKey: '',
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                    registerHandler(values)
                    setSubmitting(false)
            }}
        >
            {({ errors, touched }) => (
                <div className="">
                    <Form>
                        <h1>Inscription</h1>
                        <Field id="username" name="username" type="text" spellCheck="false" autoComplete="username" placeholder="Nom d'utilisateur" />
                        { errors.username && touched.username && <div className="error">{errors.username}</div> }

                        <Field id="password" name="password" type="password" autoComplete="current-password" placeholder="Mot de passe" />
                        { errors.password && touched.password && <div className="error">{errors.password}</div> }

                        <Field id="mailaddr" name="mailaddr" type="email" autoComplete="off" placeholder="Adresse mail" />
                        { errors.mailaddr && touched.mailaddr && <div className="error">{errors.mailaddr}</div> }

                        <button type="submit">S&apos;inscrire</button>
                        { <div className="">{message || msg || ""}</div> }

                        <div className="">
                            <p>Vous avez un compte ?
                                <Link href='/login'> Connectez-vous</Link>
                            </p>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}