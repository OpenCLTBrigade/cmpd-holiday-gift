<?php if ($showField): ?>

    <?php foreach ((array)$options['children'] as $child): ?>
        <div class="row"><?= $child->render() ?></div>
    <?php endforeach; ?>

<?php endif; ?>
