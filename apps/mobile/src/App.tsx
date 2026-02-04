import {
  IonApp,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToggle,
  IonToolbar
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { homeOutline, briefcaseOutline, codeOutline, appsOutline, moonOutline } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { getCV, parseLocale, type CVLocale } from "@agambondan/cv-data";

const labels = {
  en: {
    profile: "Profile",
    experience: "Experience",
    skills: "Skills",
    more: "More",
    links: "Links",
    education: "Education",
    languages: "Languages",
    darkMode: "Dark Mode",
    hello: "Hello",
    openToWork: "Open for backend, platform, and product engineering work."
  },
  id: {
    profile: "Profil",
    experience: "Pengalaman",
    skills: "Keahlian",
    more: "Lainnya",
    links: "Tautan",
    education: "Pendidikan",
    languages: "Bahasa",
    darkMode: "Mode Gelap",
    hello: "Halo",
    openToWork: "Terbuka untuk backend, platform, dan product engineering."
  }
} as const;

function applyTheme(dark: boolean) {
  document.body.classList.toggle("dark", dark);
}

function AppShell() {
  const [locale, setLocale] = useState<CVLocale>("en");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem("cv-mobile-locale");
    if (savedLocale) {
      setLocale(parseLocale(savedLocale));
    }

    const savedMode = localStorage.getItem("cv-mobile-dark");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedMode ? savedMode === "true" : prefersDark;
    setDarkMode(shouldUseDark);
    applyTheme(shouldUseDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("cv-mobile-locale", locale);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem("cv-mobile-dark", String(darkMode));
    applyTheme(darkMode);
  }, [darkMode]);

  const profile = useMemo(() => getCV(locale), [locale]);
  const copy = labels[locale];

  const sharedToolbar = (
    <IonToolbar>
      <IonTitle>{profile.identity.name}</IonTitle>
      <IonButtons slot="end">
        <IonButton
          className="locale-chip"
          fill={locale === "en" ? "solid" : "clear"}
          onClick={() => setLocale("en")}
          aria-label="Switch to English"
        >
          EN
        </IonButton>
        <IonButton
          className="locale-chip"
          fill={locale === "id" ? "solid" : "clear"}
          onClick={() => setLocale("id")}
          aria-label="Switch to Indonesian"
        >
          ID
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/profile" exact>
          <IonPage>
            <IonHeader>{sharedToolbar}</IonHeader>
            <IonContent className="ion-padding mobile-neon-content">
              <section className="mobile-hero">
                <p className="mobile-muted">{copy.hello}</p>
                <h1 className="mobile-hero-title">I am {profile.identity.name}</h1>
                <p className="mobile-subtitle">{profile.identity.title}</p>
                <p className="mobile-muted" style={{ marginTop: 10 }}>
                  {profile.summary}
                </p>
                <div className="mobile-actions">
                  <IonButton href={`mailto:${profile.identity.email}`} size="small">
                    Contact
                  </IonButton>
                  <IonButton fill="outline" href={profile.links.portfolio} size="small" target="_blank">
                    Web CV
                  </IonButton>
                </div>
              </section>

              <section className="mobile-card">
                <h2>{copy.profile}</h2>
                <IonList inset={false}>
                  <IonItem>
                    <IonLabel>Email</IonLabel>
                    <IonNote slot="end">{profile.identity.email}</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Phone</IonLabel>
                    <IonNote slot="end">{profile.identity.phone}</IonNote>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Location</IonLabel>
                    <IonNote slot="end">{profile.identity.location}</IonNote>
                  </IonItem>
                </IonList>
              </section>
            </IonContent>
          </IonPage>
        </Route>

        <Route path="/tabs/experience" exact>
          <IonPage>
            <IonHeader>{sharedToolbar}</IonHeader>
            <IonContent className="ion-padding mobile-neon-content">
              <section className="mobile-card">
                <h2>{copy.experience}</h2>
                {profile.experience.map((job) => (
                  <article className="mobile-timeline-item" key={`${job.company}-${job.role}`}>
                    <h3>{job.role}</h3>
                    <p className="mobile-muted">{job.company}</p>
                    <p className="mobile-muted">
                      {job.period.start} - {job.period.end}
                    </p>
                    <p className="mobile-muted">{job.bullets[0]}</p>
                  </article>
                ))}
              </section>
            </IonContent>
          </IonPage>
        </Route>

        <Route path="/tabs/skills" exact>
          <IonPage>
            <IonHeader>{sharedToolbar}</IonHeader>
            <IonContent className="ion-padding mobile-neon-content">
              <section className="mobile-card">
                <h2>{copy.skills}</h2>
                {Object.entries(profile.skills).map(([group, values]) => (
                  <section key={group} style={{ marginBottom: 12 }}>
                    <h3 style={{ textTransform: "capitalize" }}>{group}</h3>
                    <div className="mobile-chip-grid">
                      {values.map((skill) => (
                        <IonBadge className="mobile-chip" key={skill}>
                          {skill}
                        </IonBadge>
                      ))}
                    </div>
                  </section>
                ))}
              </section>
            </IonContent>
          </IonPage>
        </Route>

        <Route path="/tabs/more" exact>
          <IonPage>
            <IonHeader>{sharedToolbar}</IonHeader>
            <IonContent className="ion-padding mobile-neon-content">
              <section className="mobile-card">
                <h2>{copy.more}</h2>
                <p className="mobile-muted">{copy.openToWork}</p>
                <h3>{copy.links}</h3>
                <IonList inset={false}>
                  <IonItem button detail href={`mailto:${profile.identity.email}`}>
                    <IonLabel>Email</IonLabel>
                  </IonItem>
                  <IonItem button detail href={`tel:${profile.identity.phone}`}>
                    <IonLabel>Call</IonLabel>
                  </IonItem>
                  <IonItem button detail href={profile.links.product} target="_blank">
                    <IonLabel>Product</IonLabel>
                  </IonItem>
                  <IonItem button detail href={profile.links.portfolio} target="_blank">
                    <IonLabel>Portfolio</IonLabel>
                  </IonItem>
                  <IonItem button detail href={profile.links.github} target="_blank">
                    <IonLabel>GitHub</IonLabel>
                  </IonItem>
                  {profile.links.linkedin && (
                    <IonItem button detail href={profile.links.linkedin} target="_blank">
                      <IonLabel>LinkedIn</IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </section>

              <section className="mobile-card">
                <h3>{copy.education}</h3>
                {profile.education.map((item) => (
                  <article key={item.institution}>
                    <h4>{item.institution}</h4>
                    <p className="mobile-muted">{item.degree}</p>
                    <p className="mobile-muted">
                      {item.period.start} - {item.period.end}
                    </p>
                  </article>
                ))}
              </section>

              <section className="mobile-card">
                <h3>{copy.languages}</h3>
                <IonList inset={false}>
                  {profile.languages.map((language) => (
                    <IonItem key={language.name}>
                      <IonLabel>{language.name}</IonLabel>
                      <IonNote slot="end">{language.proficiency}</IonNote>
                    </IonItem>
                  ))}
                </IonList>
                <IonItem>
                  <IonIcon icon={moonOutline} slot="start" />
                  <IonLabel>{copy.darkMode}</IonLabel>
                  <IonToggle
                    checked={darkMode}
                    onIonChange={(event) => setDarkMode(event.detail.checked)}
                    aria-label="Toggle dark mode"
                  />
                </IonItem>
              </section>
            </IonContent>
          </IonPage>
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/profile" />
        </Route>
        <Route exact path="/">
          <Redirect to="/tabs/profile" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={homeOutline} />
          <IonLabel>{copy.profile}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="experience" href="/tabs/experience">
          <IonIcon icon={briefcaseOutline} />
          <IonLabel>{copy.experience}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="skills" href="/tabs/skills">
          <IonIcon icon={codeOutline} />
          <IonLabel>{copy.skills}</IonLabel>
        </IonTabButton>
        <IonTabButton tab="more" href="/tabs/more">
          <IonIcon icon={appsOutline} />
          <IonLabel>{copy.more}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <AppShell />
      </IonReactRouter>
    </IonApp>
  );
}
