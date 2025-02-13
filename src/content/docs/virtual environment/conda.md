---
title: Conda
---

```
positional arguments:
  command
    clean        Remove unused packages and caches.
    compare      Compare packages between conda environments.
    config       Modify configuration values in .condarc. This is modeled
                 after the git config command. Writes to the user .condarc
                 file (/home/j/.condarc) by default.
    create       Create a new conda environment from a list of specified
                 packages.
    info         Display information about current conda install.
    init         Initialize conda for shell interaction.
    install      Installs a list of packages into a specified conda
                 environment.
    list         List linked packages in a conda environment.
    package      Low-level conda package utility. (EXPERIMENTAL)
    remove       Remove a list of packages from a specified conda environment.
    rename       Renames an existing environment
    run          Run an executable in a conda environment.
    search       Search for packages and display associated information. The
                 input is a MatchSpec, a query language for conda packages.
                 See examples below.
    uninstall    Alias for conda remove.
    update       Updates conda packages to the latest compatible version.
    upgrade      Alias for conda update.
    notices      Retrieves latest channel notifications.

optional arguments:
  -h, --help     Show this help message and exit.
  -V, --version  Show the conda version number and exit.

conda commands available from other packages:
  env
```



* `-c` : channel, it specifies which repository or source Conda should use to find the package
* `-n`: name, it specifies the name of the new environment.
* `conda-forge` is a community-maintained Conda channel that provides up-to-date and well-maintained packages.
* `conda info`: if Conda is correctly installed, this will display information about your installation
* `conda env list`: check available Conda environments




## Remove the environment

`conda remove --name myenv --all`



## List all existed env


`conda env list`


log: 
`conda install -y -c pytorch pytorch=2.0.0 torchaudio=2.0.0 torchvision=0.15.0`
this is done, with one error: Solving environment: failed with initial frozen solve. Retrying with flexible solve.


solving environment forever: happen on conda-forge




### need to find where is conda installed, and where is base environment




disable conda base environment not be  activated on startup:
`conda config --set auto_activate_base false`




## Delete all conda things from the computer

#### check rpm
`rpm -qa | grep conda` : show all conda relative things, remove them, for example :
```bash
sudo dnf remove python3-conda python3-conda-package-handling
```

#### check PATH:
`export $PATH` , check if anything conda relative in the output

#### delete others

```bash
rm -rf ~/.conda ~/.anaconda ~/.jupyter ~/.ipython 
```

#### clean DNF Metadata (option)
`sudo dnf clean all`


#### verify if conda all gone
`conda --version`


```bash
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```


