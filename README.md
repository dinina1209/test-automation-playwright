# Test Automation Essentials Dev Academy Aotearoa

Hola! Welcome to the Test Automation Essentials workshop by Dev Academy Aotearoa. This workshop is designed to provide you with a comprehensive understanding of test automation and its importance in modern software development practices.

## READ THIS FIRST:

[Workshop Structure](structure.md)

## Initial Setup:

Please make a fork of this repo and clone it locally.
Click the fork button

For the following commands, you can use macOS Terminal app or, if you are using Windows, [Git Bash](https://git-scm.com/downloads).

To clone the forked repository locally, use the following command:

```
git clone test-automation-essentials-dev-academy
```

Once the repository is cloned, you can navigate to the cloned directory using the following command:

```
cd test-automation-essentials-dev-academy
```

## Adding Upstream Remote

To keep your forked repository up to date with the original repository, add an upstream remote. Follow these steps to add the upstream remote:

1. Add the upstream remote using the following command:

```
git remote add upstream test-automation-essentials-dev-academy
```

2. Verify that the upstream remote has been added successfully by running the following command:

```
git remote -v
```

You should see both the `origin` remote (your forked repository) and the `upstream` remote (the original repository).

Now you can fetch and merge changes from the original repository into your forked repository using the `git fetch upstream` and `git merge upstream/main` commands.

## Schedule:

- Now: [Prep](schedule/0-warmup.md)
- Week 1: [Introduction to Testing and programming for Testers](schedule/week1.md)
- Week 2: [Introduction to Test Automation](schedule/week2.md)
- Week 3: [API and E2E Automation](schedule/week3.md)
- Week 4: [Test Automation Frameworks](schedule/week4.md)
- Week 5: [Test Automation Best Practices](schedule/week5.md)
- Week 6: [Continuous Integration and Delivery](schedule/week6.md)
- Week 7: [Final Project](schedule/week7-final-project.md)
