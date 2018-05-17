from invoke import task, env, run
import os
import shutil
import sys
from six.moves import socketserver

from pelican.server import ComplexHTTPRequestHandler

# Local path configuration (can be absolute or relative to fabfile)
env.deploy_path = 'output'
DEPLOY_PATH = env.deploy_path

# Github Pages configuration
env.github_pages_branch = "master"

# Port for `serve`
PORT = 8000

@task
def clean(ctx):
    """Remove generated files"""
    if os.path.isdir(DEPLOY_PATH):
        shutil.rmtree(DEPLOY_PATH)
        os.makedirs(DEPLOY_PATH)

@task
def build(ctx):
    """Build local version of site"""
    run('pelican -s pelicanconf.py')

@task
def rebuild(ctx):
    """`build` with the delete switch"""
    run('pelican -d -s pelicanconf.py')

@task
def regenerate(ctx):
    """Automatically regenerate site upon file modification"""
    run('pelican -r -s pelicanconf.py')

@task
def serve(ctx):
    """Serve site at http://localhost:8000/"""
    os.chdir(env.deploy_path)

    class AddressReuseTCPServer(socketserver.TCPServer):
        allow_reuse_address = True

    server = AddressReuseTCPServer(('', PORT), ComplexHTTPRequestHandler)

    sys.stderr.write('Serving on port {0} ...\n'.format(PORT))
    server.serve_forever()

@task
def reserve(ctx):
    """`build`, then `serve`"""
    build(ctx)
    serve(ctx)

@task
def preview(ctx):
    """Build production version of site"""
    run('pelican -s publishconf.py')

@task
def gh_pages(ctx):
    """Publish to GitHub Pages"""
    rebuild(ctx)
    run("ghp-import -b {github_pages_branch} {deploy_path} -p".format(**vars(env)))
