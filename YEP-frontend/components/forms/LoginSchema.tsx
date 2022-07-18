import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LoginSchema({ msg }) {
    const router = useRouter()
    const [message, setMessage] = useState('')

    useEffect(() => {
        document.title = "Login | Meazay"
    })

    const schema = yup.object().shape({
        mailaddr: yup.string()
            .required('Veuillez indiquer votre adresse mail')
            .email(),
        password: yup.string()
            .required("Merci d'indiquer votre mot de passe")
            .min(8, 'Votre mot de passe doit contenir au moins 8 caractères')
            .max(64, 'Votre mot de passe doit contenir au maximum 64 caractères')
    })

    async function loginHandler(values) {
        const payload = JSON.parse(JSON.stringify(values))
        const url     = '/login'
        const body    = {
            mailaddr: payload.mailaddr,
            password: payload.password,
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

            if (res.redirected)
                router.push('/home')
            else
                setMessage("Une erreur est survenue lors de la connexion")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Formik
            initialValues={{
                mailaddr: '',
                password: ''
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                loginHandler(values)
                setSubmitting(false)
            }}
        >
            {({ errors, touched }) => (
                <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-10 font-mono text-white">
                    <Form className="bg-purple-500  px-6 py-8 rounded shadow-md w-full">
                        <h1 className="mb-8 text-3xl text-center">Connexion</h1>
                        <Field className="bg-purple-900 block border border-grey-light w-full p-3 rounded mb-4" id="mailaddr" name="mailaddr" type="text" spellCheck="false" autoComplete="email" placeholder="Adresse e-mail" />
                        { errors.mailaddr && touched.mailaddr && <div className="error">{errors.mailaddr}</div> }

                        <Field className="bg-purple-900 block border border-grey-light w-full p-3 rounded mb-4" id="password" name="password" type="password" autoComplete="current-password" placeholder="Mot de passe" />
                        { errors.password && touched.password && <div className="error">{errors.password}</div> }

                        <button className="bg-purple-800 w-full text-center py-3 rounded hover:bg-green-dark focus:outline-none my-1" type="submit">Se connecter</button>
                        { <div className="error">{message || msg || ""}</div> }

                        <div className="">
                            <p>Vous ne possédez pas de compte ?
                                <Link href="/register" className="text-purple-900"> Inscrivez-vous</Link>
                            </p>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    )
}