version := "1.0"
name := "play-ember-demo"
scalaVersion := "2.11.8"
resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
libraryDependencies ++= Seq(
	javaJdbc,
	cache,
	javaWs
)

lazy val `play-ember-demo` = (project in file("."))
	.enablePlugins(PlayJava)
