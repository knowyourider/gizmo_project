from django.shortcuts import render
from django.views.generic import DetailView, TemplateView

# class ProjectDetailView(MobileFullMixin, DetailView):
#     model = Context
#     # context_object_name = 'object'
#     # template_name = 'supporting/person_detail.html'

class ProjectDetailView(TemplateView):
    """
    has to get first page
    """
    template_name = "projects/project_slim.html"
    # extend_base - default from FeatureDetailView, or override in sub class
    
    # put the page name into the context 
    def get_context_data(self, **kwargs):
        context = super(ProjectDetailView, self).get_context_data(**kwargs)
        # get the short name
        # print(" -- **kwargs: " + kwargs['slug'])
        # page = "impressions"
        page = kwargs['slug']
        # add variables to context
        context.update({'page': page })
        return context
